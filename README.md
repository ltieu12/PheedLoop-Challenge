# Event Registration

This project is a simplified events management interface that allows attendees to pick sessions for an upcoming conference. The sessions have specific time blocks, and we want to prevent attendees from signing up for overlapping sessions. We also want to capture basic attendee information.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

### Run The Project
To run the project locally, follow these steps:
1. Clone the repository ```git clone https://github.com/ltieu12/PheedLoop-Challenge.git```.
2. Navigate to project root directory ```cd event-registration```.
3. Run ```npm install``` to install required packages.
4. Run ```npm run dev``` to start the application.
5. Navigate to http://localhost:5173/ to use the application


### Design & Implementation
(If you see the UI is somewhat familiar, yes, I got inspired from PheedLoop's website. I really like the simple yet informative design which is very suitable for an event platform, so I choose to follow the fonts and color palette.)

Regarding the UI of this page, this is a fairly simple form with 2 parts: attendee's information and session selection.
- Attendee's Information: This section contains basic attendees' information such as name, email and job title. It may depend on the event, but for now, I don't think the Job Title is required (if the person is unemployed or does not want to share) so I made it an optional field. I handle basic validation such as non-empty required fields, correct name,email format. Although there is a default check from the browser for valid email format, I also included additional check to avoid something like "#$#$$@email.com". The email regular expression was referenced from [here](https://www.geeksforgeeks.org/how-to-validate-email-address-using-regexp-in-javascript/)

- Session Selection: This section displays a list of available sessions as clickable component so users can choose sessions they want to attend. To handle overlap sessions, I first started at the description where I notified user to avoid selecting overlapping sessions. If user is about to choose a potential overlapping session, the app will not allow users to do so and display a message, indicating the latest chosen session conflicts with previously chosen sessions. The message also indicates which sessions are conflicted and the time. The clickable component allows users to select and de-select freely. This real-time validation will help prevent further mistakes, notify users right at that moment rather than let the users choose and validate after form submission. <br>
Another validation for this section is when users not choosing any sessions. I assume not choosing sessions is invalid so upon submitting the form, there will be an error message and notify users to choose at least 1 session to proceed.

If everything is validated, there will be a modal display successful message and a summary of users' information when submitting the form.


### Assumptions
Here are some assumptions that I made for this project:
1. Job Title field is not required.
2. Not choosing any session is considered invalid.
3. If the sessions are in different dates, there will be no overlap (no session will last from one day to the next day). Only consider overlaps for sessions within the same date.
4. The start/end time of each session is valid (startTime < endTime).
4. The session list is already sorted by time (although not sorted will not affect the functionality).
