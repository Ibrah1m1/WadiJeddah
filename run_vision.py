import sys
import Vision
import CoreImage
from Foundation import NSURL

image_path = "page17_full.png"
url = NSURL.fileURLWithPath_(image_path)
image = CoreImage.CIImage.imageWithContentsOfURL_(url)

request = Vision.VNRecognizeTextRequest.alloc().init()
request.setRecognitionLanguages_(["ar-SA", "en-US"])

handler = Vision.VNImageRequestHandler.alloc().initWithCIImage_options_(image, None)
handler.performRequests_error_([request], None)

for result in request.results():
    print(result.topCandidates_(1)[0].string())
