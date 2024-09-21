# 
#  Created by Bradley Austin Davis on 2016/02/16
#
#  Distributed under the Apache License, Version 2.0.
#  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
# 
macro(TARGET_GLFW3)
    if (NOT ANDROID)
        pkg_check_modules(GLFW REQUIRED glfw3)
        target_link_libraries(${TARGET_NAME} PUBLIC ${GLFW_LIBRARIES})
    endif()
endmacro()