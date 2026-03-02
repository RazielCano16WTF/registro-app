@echo off
REM ----------------------------------------------------------------------------
REM Maven Wrapper
REM ----------------------------------------------------------------------------

setlocal

set DIRNAME=%~dp0
set MVNW_CMD_LINE_ARGS=%*
set MVNW_VERBOSE=

if "%MVNW_VERBOSE%" == "" goto notVerbose
set MVNW_VERBOSE=-X

:notVerbose
if exist "%DIRNAME%.mvn\wrapper\maven-wrapper.jar" goto gotJar
echo Downloading Maven Wrapper...
powershell -Command "Invoke-WebRequest -Uri https://repo1.maven.org/maven2/io/takari/maven-wrapper/0.5.6/maven-wrapper-0.5.6.jar -OutFile '%DIRNAME%.mvn\wrapper\maven-wrapper.jar'"
:gotJar

java %MVNW_VERBOSE% -Dmaven.multiModuleProjectDirectory="%CD%" -cp "%DIRNAME%.mvn\wrapper\maven-wrapper.jar" org.apache.maven.wrapper.MavenWrapperMain %MVNW_CMD_LINE_ARGS%

endlocal
