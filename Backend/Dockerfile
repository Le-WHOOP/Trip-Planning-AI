FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY Backend.sln ./
COPY Backend.Api/Backend.Api.csproj Backend.Api/
COPY Backend.Bll/Backend.Bll.csproj Backend.Bll/
COPY Backend.Dal/Backend.Dal.csproj Backend.Dal/
RUN dotnet restore

COPY Backend.Api/ Backend.Api/
COPY Backend.Bll/ Backend.Bll/
COPY Backend.Dal/ Backend.Dal/
RUN dotnet publish -c Release --property:PublishDir=out

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app

COPY --from=build /src/Backend.Api/out/ ./

EXPOSE 8080
ENTRYPOINT [ "dotnet", "Backend.Api.dll" ]
