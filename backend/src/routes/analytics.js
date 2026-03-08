import express from "express";
import supabase from "../config/supabase.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Helper: Validate API Key and Get Project
|--------------------------------------------------------------------------
*/

async function getProject(api_key) {

  const { data: project, error } = await supabase
    .from("projects")
    .select("id")
    .eq("api_key", api_key)
    .single();

  if (error || !project) {
    return null;
  }

  return project;
}


/*
|--------------------------------------------------------------------------
| GET /analytics/events
|--------------------------------------------------------------------------
| Returns event counts for a project
*/

router.get("/events", async (req, res) => {

  try {

    const { api_key } = req.query;

    if (!api_key) {
      return res.status(400).json({
        message: "api_key is required"
      });
    }

    const project = await getProject(api_key);

    if (!project) {
      return res.status(401).json({
        message: "Invalid API key"
      });
    }

    const { data, error } = await supabase
      .from("events")
      .select("event_name")
      .eq("project_id", project.id);

    if (error) return res.status(500).json(error);

    const eventCounts = {};

    data.forEach(event => {

      eventCounts[event.event_name] =
        (eventCounts[event.event_name] || 0) + 1;

    });

    res.json({
      total_events: data.length,
      event_breakdown: eventCounts
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Internal server error"
    });

  }

});


/*
|--------------------------------------------------------------------------
| GET /analytics/users
|--------------------------------------------------------------------------
| Returns number of active users
*/

router.get("/users", async (req, res) => {

  try {

    const { api_key } = req.query;

    if (!api_key) {
      return res.status(400).json({
        message: "api_key is required"
      });
    }

    const project = await getProject(api_key);

    if (!project) {
      return res.status(401).json({
        message: "Invalid API key"
      });
    }

    const { data, error } = await supabase
      .from("events")
      .select("user_id")
      .eq("project_id", project.id);

    if (error) return res.status(500).json(error);

    const uniqueUsers = new Set(data.map(e => e.user_id));

    res.json({
      active_users: uniqueUsers.size
    });

  } catch (err) {

    res.status(500).json({
      message: "Internal server error"
    });

  }

});


/*
|--------------------------------------------------------------------------
| GET /analytics/top-events
|--------------------------------------------------------------------------
| Returns most frequent events
*/

router.get("/top-events", async (req, res) => {

  try {

    const { api_key } = req.query;

    if (!api_key) {
      return res.status(400).json({
        message: "api_key is required"
      });
    }

    const project = await getProject(api_key);

    if (!project) {
      return res.status(401).json({
        message: "Invalid API key"
      });
    }

    const { data, error } = await supabase
      .from("events")
      .select("event_name")
      .eq("project_id", project.id);

    if (error) return res.status(500).json(error);

    const counts = {};

    data.forEach(e => {

      counts[e.event_name] =
        (counts[e.event_name] || 0) + 1;

    });

    const topEvents = Object.entries(counts)
      .map(([event, count]) => ({
        event_name: event,
        count
      }))
      .sort((a, b) => b.count - a.count);

    res.json({
      top_events: topEvents
    });

  } catch (err) {

    res.status(500).json({
      message: "Internal server error"
    });

  }

});


/*
|--------------------------------------------------------------------------
| GET /analytics/daily-events
|--------------------------------------------------------------------------
| Returns number of events per day
*/

router.get("/daily-events", async (req, res) => {

  try {

    const { api_key } = req.query;

    if (!api_key) {
      return res.status(400).json({
        message: "api_key is required"
      });
    }

    const project = await getProject(api_key);

    if (!project) {
      return res.status(401).json({
        message: "Invalid API key"
      });
    }

    const { data, error } = await supabase
      .from("events")
      .select("timestamp")
      .eq("project_id", project.id);

    if (error) return res.status(500).json(error);

    const dailyCounts = {};

    data.forEach(e => {

      const date = new Date(e.timestamp)
        .toISOString()
        .split("T")[0];

      dailyCounts[date] =
        (dailyCounts[date] || 0) + 1;

    });

    const result = Object.entries(dailyCounts)
      .map(([date, count]) => ({
        date,
        count
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json({
      daily_events: result
    });

  } catch (err) {

    res.status(500).json({
      message: "Internal server error"
    });

  }

});


/*
|--------------------------------------------------------------------------
| GET /analytics/summary
|--------------------------------------------------------------------------
| Returns overview stats
*/

router.get("/summary", async (req, res) => {

  try {

    const { api_key } = req.query;

    if (!api_key) {
      return res.status(400).json({
        message: "api_key is required"
      });
    }

    const project = await getProject(api_key);

    if (!project) {
      return res.status(401).json({
        message: "Invalid API key"
      });
    }

    const { data, error } = await supabase
      .from("events")
      .select("event_name,user_id")
      .eq("project_id", project.id);

    if (error) return res.status(500).json(error);

    const totalEvents = data.length;

    const uniqueUsers =
      new Set(data.map(e => e.user_id)).size;

    const counts = {};

    data.forEach(e => {

      counts[e.event_name] =
        (counts[e.event_name] || 0) + 1;

    });

    const topEvent =
      Object.entries(counts)
      .sort((a, b) => b[1] - a[1])[0]?.[0];

    res.json({
      total_events: totalEvents,
      total_users: uniqueUsers,
      top_event: topEvent
    });

  } catch (err) {

    res.status(500).json({
      message: "Internal server error"
    });

  }

});

export default router;