import express from "express";
import supabase from "../config/supabase.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| POST /events/track
|--------------------------------------------------------------------------
| Receives analytics events from client applications
*/

router.post("/track", async (req, res) => {
  try {
    const { api_key, event_name, user_id, metadata } = req.body;

    if (!api_key || !event_name) {
      return res.status(400).json({
        message: "api_key and event_name are required"
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Validate API Key
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | Insert Event
    |--------------------------------------------------------------------------
    */

    const { data, error } = await supabase
      .from("events")
      .insert([
        {
          project_id: project.id,
          event_name,
          user_id,
          metadata,
          timestamp: new Date()
        }
      ])
      .select();

    if (error) {
      return res.status(500).json(error);
    }

    res.status(201).json({
      message: "Event recorded",
      event: data
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Internal server error"
    });
  }
});

export default router;