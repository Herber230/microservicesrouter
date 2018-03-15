FROM microsoft/aspnetcore-build:2.0 AS build-env
WORKDIR /app

COPY ./src/*.csproj ./
RUN dotnet restore

COPY ./src ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM microsoft/aspnetcore:2.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "tx2-api.dll"]