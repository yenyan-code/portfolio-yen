import urllib.request
import re
import ssl

ctx = ssl._create_unverified_context()

url = "https://itti.framer.website/"
req = urllib.request.Request(
    url, 
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
)
try:
    html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
    # Remove style and script tags
    html_clean = re.sub(r'<style[\s\S]*?</style>', '', html)
    html_clean = re.sub(r'<script[\s\S]*?</script>', '', html_clean)
    
    with open("itti_clean.html", "w", encoding="utf-8") as f:
        f.write(html_clean)
    print("Successfully saved itti_clean.html")
except Exception as e:
    print("Error:", e)
