#! /usr/bin/env python3

# Copyright Jeffrey LeBlanc, 2023. MIT License.

# Python
from pathlib import Path
import asyncio
import logging
# Tornado
from tornado.web import RequestHandler, StaticFileHandler, Application


class BaseHandler(RequestHandler):
    def write_json(self, obj, indent=None):
        self.set_header("Content-Type", "application/json")
        s = json.dumps(obj,indent=indent)
        self.write(s)

class MainHandler(BaseHandler):
    def get(self):
        examples = self.application.example_dir
        lst = [(n,e["name"]) for n,e in self.application.example_dir.items()]
        lst.sort(key = lambda e: e[0])
        self.render("main.html",examples=lst)

class ExampleHandler(BaseHandler):
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

class MyApp(Application):

    def __init__(self):
        self.parent_dir = Path(__file__).parent
        self.template_dir = self.parent_dir /"_templates"

        # Collect the example directories
        self.example_dir = {}
        self.load_example_dir(self.parent_dir)
        print(self.example_dir)

        # Settings
        settings = dict(
            template_path= self.template_dir,
            autoreload= True,
            debug= True
        )

        # Build handlers
        handlers = [
            (r"^/?$", MainHandler),
            (r"^/example/(?P<number>\d+)/?$", ExampleHandler),
            (r"^/reload/?$", InternalReloadExamplesHandler),
            (r"^/static/_lib/(.*)",StaticFileHandler,{"path":self.parent_dir/"_lib"})
        ]
        for k,v in self.example_dir.items():
            name = v["name"]
            path = f"/static/{name}/(.*)"
            handlers.append((path,StaticFileHandler,{"path":self.parent_dir/name}))

        super().__init__(handlers,**settings)

    def load_example_dir(self, src_dir):
        exclude_dir = ("_templates","_lib")
        self.example_dir = {}
        for p in src_dir.iterdir():
            if p.is_dir() and p.name not in exclude_dir:
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

