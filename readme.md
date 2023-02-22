MOCK - its necessary object to functionality tests


  Scenery: 
    point A
    point B
    point C

    A => B - it's ok? what is a result? Is a mock.

    this mock to runner test B => C is a result from A => B
    B => C  - i'ts ok?

    its has a problem when is duplicated 
    A => B => C


STUB:
  - Is an interceptor of call externs (DB, API Extern, etc...) 
  - Guarantee that the tests will be offline (Without system, whitout ethernet and memory)

SPY:
  - is a type of stub, but its used when:
    - to validate how the function is called
    - with which params 
    - how many times