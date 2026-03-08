import express from "express";
import supabase from "../config/supabase.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| POST /projects
|--------------------------------------------------------------------------
| Create a new analytics project
*/

router.post("/", async (req, res) => {
  try {
    const { name, organization_id } = req.body;

    if (!name || !organization_id) {
      return res.status(400).json({
        message: "name and organization_id are required"
      });
    }

    const apiKey = "pk_live_" + uuidv4();

    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          name,
          organization_id,
          api_key: apiKey
        }
      ])
      .select();

    if (error) return res.status(400).json(error);

    res.status(201).json({
      message: "Project created",
      project: data
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error"
    });
  }
});

export default router;