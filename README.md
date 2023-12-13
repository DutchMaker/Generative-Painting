# Generative Painting

- Install node modules (`npm install`)
- Create `.env` file containing `OPENAI_API_KEY="<your_api_key_here>"`
- Run the server (`node server.js`)
- Browse to `http://localhost:3000` and get an AI-generated reinterpretation of a famous painting, ready to hang on your wall.

If you want to use the GPIO buttons to reload image or shutdown the Pi:

- Install `xdotool` (`sudo apt-get install xdotool`)
- Install Python GPIO library (`sudo pip3 install RPi.GPIO`)
- Add the `buttons.py` script to the crontab to run it at boot