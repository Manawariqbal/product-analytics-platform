import express from "express";
import supabase from "../config/supabase.js";

const router = express.Router();

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

    /* Get project */

    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("id")
      .eq("api_key", api_key)
      .single();

    if (projectError || !project) {
      return res.status(401).json({
        message: "Invalid API key"
      });
    }

    /* Fetch events */

    const { data, error } = await supabase
      .from("events")
      .select("event_name")
      .eq("project_id", project.id);

    if (error) {
      return res.status(500).json(error);
    }

    const eventCounts = {};

    data.forEach((event) => {
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

    const { data: project } = await supabase
      .from("projects")
      .select("id")
      .eq("api_key", api_key)
      .single();

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

export default router;