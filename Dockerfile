FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build

# Install Node.js
RUN apt-get install --yes curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential

WORKDIR /src
COPY . .

RUN dotnet restore "./ReactApp.csproj"
RUN dotnet publish "ReactApp.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:3.1

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "ReactApp.dll"]