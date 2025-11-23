const express = require('express');
const cors = require('cors');
const { Composio } = require('composio-core');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const composio = new Composio({ apiKey: process.env.COMPOSIO_API_KEY });

// API Routes
app.get('/api/events', async (req, res) => {
  try {
    const entity = await composio.getEntity(process.env.ENTITY_ID);
    const result = await entity.execute({
      actionName: 'GOOGLECALENDAR_FIND_EVENT',
      params: { calendarId: 'primary' }
    });

    console.log("Raw result:", result);
    const events = result?.data?.event_data?.event_data || [];
    res.json({ events });

  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.post('/api/events/create', async (req, res) => {
  try {
    const { summary, description, start, end } = req.body;
    const entity = await composio.getEntity(process.env.ENTITY_ID);

    const result = await entity.execute({
      actionName: 'GOOGLECALENDAR_CREATE_EVENT',
      params: {
        calendar_id: "primary",
        summary,
        description: description || "",
        start_datetime: start,
        end_datetime: end
      }
    });

    console.log("Event created:", result);
    const createdEvent = result?.data?.event_data?.event_data?.[0] || result?.data?.event_data || result?.data || {};
    res.json(createdEvent);

  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Export for Vercel serverless
module.exports = app;