from pydantic import RootModel
from typing import Any

class GenericBody(RootModel[Any]):
    pass
