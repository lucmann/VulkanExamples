#
#  Created by Bradley Austin Davis on 2016/06/03
#  Copyright 2013-2016 High Fidelity, Inc.
#
#  Distributed under the Apache License, Version 2.0.
#  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
#

macro(TARGET_ASSIMP)
    find_package(assimp REQUIRED)
    message(STATUS "found: ${ASSIMP_FOUND}")
    message(STATUS "libraries: ${ASSIMP_LIBRARIES}")
    message(STATUS "library_dirs: ${ASSIMP_LIBRARY_DIRS}")
    message(STATUS "include_dirs: ${ASSIMP_INCLUDE_DIRS}")
    message(STATUS "ldflags: ${ASSIMP_LDFLAGS}")
    message(STATUS "cflags: ${ASSIMP_CFLAGS}")
    target_include_directories(${TARGET_NAME} PUBLIC assimp::assimp)
    target_link_libraries(${TARGET_NAME} PRIVATE assimp::assimp)
endmacro()
