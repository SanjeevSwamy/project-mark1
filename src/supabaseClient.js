// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// Hardcoded values (replace with your actual credentials)
const supabaseUrl = "https://xzsqpebsioqpmosbomnz.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6c3FwZWJzaW9xcG1vc2JvbW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NjEwNzcsImV4cCI6MjA2MjQzNzA3N30.QDT3OrE7IIrDEowBQwPaVZJSjcF-naNHiSQlMxLYdIQ"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
