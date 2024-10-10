
# PPS Easy

[![CI](https://github.com/abarghoud/pps-easy/actions/workflows/ci.yml/badge.svg)](https://github.com/abarghoud/pps-easy/actions/workflows/ci.yml)

## Overview

This is an open-source project that allows users to quickly complete the PPS (Parcours de Prévention Santé) journey in France by simulating the required steps. It interacts with PPS APIs to optimize the process, enabling faster access to the PPS certification.

Currently, the API exposes a single endpoint to simulate the completion of the PPS journey.

## Features

- **Quick PPS Completion**: Simulates the process, allowing users to obtain their PPS certification rapidly (3 seconds).
- **Data safe**: Your data is just transferred to https://pps.athle.fr/, and the result is sent back to your provided email

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/pps-bypass-api.git
   cd pps-bypass-api
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Run the application:

   ```bash
   yarn global add nx@latest
   nx serve api
   ```

## Usage

You can use the following `curl` command to simulate the PPS journey:

```bash
curl --location 'http://localhost:3000/api/pps/generate' \
--header 'Content-Type: application/json' \
--data-raw '{
    "birthday": "1990-01-01",
    "event_date": "2024-12-25",
    "email": "example@example.com",
    "firstname": "John",
    "gender": "male",
    "lastname": "DOE"
}'
```

Replace the placeholder data with your personal information to simulate your PPS journey.

**_Please note the race date should be within 3 months_**

## Contribution

Contributions are welcome! Feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License.
