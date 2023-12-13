import RPi.GPIO as GPIO
import time
import os

GPIO_RELOAD=14
GPIO_SHUTDOWN=16

# GPIO setup
GPIO.setmode(GPIO.BCM)
GPIO.setup(GPIO_RELOAD, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(GPIO_SHUTDOWN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

# Function to reload Chromium
def reload_chromium():
    # Using xdotool to send the F5 key (refresh) to Chromium
    os.system("export DISPLAY=:0 && xdotool search --onlyvisible --class chromium key F5")

def shutdown():
    os.system("sudo shutdown now")

# Main loop
try:
    while True:
        # Check if Reload button is pressed
        if GPIO.input(GPIO_RELOAD) == False:
            reload_chromium()
            # Debounce delay
            time.sleep(0.5)
        # Check if Shutdown button is pressed
        if GPIO.input(GPIO_SHUTDOWN) == False:
            reload_chromium()
            # Debounce delay
            time.sleep(0.5)
except KeyboardInterrupt:
    GPIO.cleanup()
