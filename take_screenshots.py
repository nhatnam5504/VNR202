import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

def take_screenshots():
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--window-size=1200,800")
    
    # Let's hope the user has Chrome + ChromeDriver locally, or Selenium Manager handles it
    driver = webdriver.Chrome(options=options)
    
    try:
        driver.get("http://localhost:5173")
        time.sleep(3) # wait for Vite to compile and React to render
        
        # 1. Top of page
        driver.save_screenshot("d:\\VNR\\screenshot_top.png")
        print("Saved Top screenshot")
        
        # 2. Scroll to GenZ
        driver.execute_script("window.scrollTo(0, 800)")
        time.sleep(1)
        driver.save_screenshot("d:\\VNR\\screenshot_genz.png")
        print("Saved GenZ screenshot")
        
        # 3. Scroll to Timeline
        driver.execute_script("window.scrollTo(0, 1600)")
        time.sleep(1)
        driver.save_screenshot("d:\\VNR\\screenshot_timeline.png")
        print("Saved Timeline screenshot")

        # 4. Scroll to Bottom
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(1)
        driver.save_screenshot("d:\\VNR\\screenshot_bottom.png")
        print("Saved Bottom screenshot")
        
    finally:
        driver.quit()

if __name__ == "__main__":
    take_screenshots()
