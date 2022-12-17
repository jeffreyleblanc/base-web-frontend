#! /usr/bin/env python3

# Copyright Jeffrey LeBlanc, 2022. MIT License.

# Python
from pathlib import Path
import asyncio
import logging
# Tornado
import tornado.web



class BaseHandler(tornado.web.RequestHandler):

    def write_json(self, obj, indent=None):
        self.set_header("Content-Type", "application/json")
        s = json.dumps(obj,indent=indent)
        self.write(s)

class MainHandler(BaseHandler):
    def get(self):
        self.render("index.html")

class APIHandler(BaseHandler):
    def post(self):
        data = tornado.escape.json_decode(self.request.body)
        print('DATA!',data)
        self.write_json({'status':'OK'})

class MyApp(tornado.web.Application):

    def __init__(self):
        here = Path(__file__).parent
        static_dir = here / 'static'
        template_dir = here /'templates'

        # Settings
        settings = dict(
            static_path= static_dir,
            template_path= template_dir,
            autoreload= True,
            debug= True
        )

        handlers = [
            (r"/", MainHandler)
        ]

        super().__init__(handlers,**settings)


async def main():

    # Setup logging
    logging.basicConfig(level=logging.INFO,format='%(message)s',)

    # Setup the server
    http_server = MyApp()
    http_server.listen(8888)

    # Setup the shutdown systems
    shutdown_trigger = asyncio.Event()
    await shutdown_trigger.wait()


if __name__ == "__main__":
    asyncio.run(main())

