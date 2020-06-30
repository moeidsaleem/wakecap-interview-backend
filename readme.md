## Wakecap Interview Test

The task is basically to write a cron job that will generate report for each worker working
at a site having different timezones.

## SOLUTION

Will be creating models as described below.

### TECHNOLOGY

- Node.js
- Typescript
- Express ( for a lightweight server )
- Mongoose ( wrapper over mongodb )
- AgendaJS ( lightweight scheduling )
- TypeDI ( Dependency injector )
- Reflect metadata ( decorator support )
- mongoose-geojson-schema

#### Assumptions

What i understand from the given requirements are as follow:

##### Models

1. Client
2. Site
3. Worker
4. Locations
5. Reports

Details are as follow

###### Client

- title
- email
- phone

###### Site

- client ( ObjectId )
- timezone ( String )
- starting_hours ( String )
- ending_hours ( String )
- late_threshold ( String )

###### Worker

- site_id
- name

###### Location

- coordinates
- is_active
- duration
- worker_id

###### Report (per site )

- absent_workers
- late_workers
- active_hours
- inactive_hours

##### Relationships

Based on my assumption, the relationship b/w all models are as followed;

Client ----> Sites ----> Workers

- Client can have multiple sites
- Every site has multiple workers

##### Scheduling

Report will be generated at 00:00:00 every night for a site.

- Task: Create a cron job that will generate a report at 00:00:00 for every sites.

##### Fake Data

Create a cron job that will update location
every 3 minutes.

- Task:

### TESTING

- Mocha ( testing framework )
- Chai ( assertion tool )
