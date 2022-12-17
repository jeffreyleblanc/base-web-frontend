#! /usr/bin/env python3

# Copyright Jeffrey LeBlanc, 2022. MIT License.

import asyncio
import datetime
import signal
import logging
import tornado.web


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        now = datetime.datetime.now()
        self.write(f"Hello world at {now}\n")

class MyApp(tornado.web.Application):

    def __init__(self):
        self._handlers = []
        self._settings = {}
        self.initialize()
        super().__init__(self._handlers,**self._settings)

    def initialize(self):
        # Handlers
        self._handlers += [
            (r"/", MainHandler)
        ]

        # Settings
        self._settings = dict(
            debug= True
        )


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

