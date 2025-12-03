// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// Hardcoded values (replace with your actual credentials)
const supabaseUrl = "https://oouvemxwekfeaegswopw.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vdXZlbXh3ZWtmZWFlZ3N3b3B3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2OTM0NTcsImV4cCI6MjA4MDI2OTQ1N30.gDaiBONqCKRy9T8Fq129upbjeMt15K53yJrXxs_YNlo"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
