Most training was done on the web interface.

However, the setting up of the reminder.set intent was created.
This was done by:
1) copying alarm.set.json and alarm.set_usersays_en.json and renaming to reminder.set
2) replacing all the alarm.set inside the file
3) Erasing all the usersays entries except for one. (this json is an array)
4) Modifying the one entry to be for a reminder instead of an alarm.
5) NOTE: I also changed the ids so they wouldn't overlap. However, I don't think this is necessary. DialogFlow asks if you want to overwrite or create a new agent. I think create a new agent changes the ids.
6) NOTE: I did not do the alarm.set - contexts. I think these are to set another or a recurrence.
7) I'm also not sure about how to ask for follow up if there are missing fields. I think that is handled by the bot... but would this pass back to dialogFlow to check? Example, if there is a schedule.set without a day, the bot should ask for day. Should that text be sent back to dialogFlow? If so, do I need to (A) have a new intent in the main context? (B) have a new intent on an existing context? (C) other?
