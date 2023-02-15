#! /usr/bin/env python3

# Copyright Jeffrey LeBlanc, 2023. MIT License.

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
    def get(self, number):
        example = self.application.example_dir[number]
        dpath = example["path"]/"dependencies.html"
        dependencies = dpath.read_text()
        self.render("index.html",
            dependencies= dependencies,
            example_name= example["name"],
            kind= example["kind"]
        )

class APIHandler(BaseHandler):
    def post(self):
        data = tornado.escape.json_decode(self.request.body)
        print('DATA!',data)
        self.write_json({'status':'OK'})

class InternalReloadExamplesHandler(BaseHandler):
    def get(self):
        self.application.load_example_dir()

class MyApp(tornado.web.Application):

    def __init__(self):
        self.parent_dir = Path(__file__).parent
        self.static_dir = self.parent_dir / "static"
        self.template_dir = self.parent_dir /"templates"

        # Collect the example directories
        self.example_dir = {}
        self.load_example_dir()
        print(self.example_dir)

        # Settings
        settings = dict(
            static_path= self.static_dir,
            template_path= self.template_dir,
            autoreload= True,
            debug= True
        )

        handlers = [
            (r"^/example/(?P<number>\d+)/?$", MainHandler),
            (r"^/reload/?$", InternalReloadExamplesHandler)
        ]

        super().__init__(handlers,**settings)

    def load_example_dir(self):
        print("Loading the examples")
        self.example_dir = {}
        for p in self.static_dir.iterdir():
            if p.is_dir() and p.name != "_lib":
                nid,kind = p.name.split('-')[:2]
                self.example_dir[nid] = {
                    "name": p.name,
                    "nid": nid,
                    "kind": kind,
                    "path": p
                }


async def main():

    # Setup logging
    logging.basicConfig(level=logging.INFO,format='%(message)s',)

    # Setup the server
    http_server = MyApp()
    http_server.listen(8888)
    print("Running at 0.0.0.0:8888")

    # Setup the shutdown systems
    shutdown_trigger = asyncio.Event()
    await shutdown_trigger.wait()


if __name__ == "__main__":
    asyncio.run(main())

