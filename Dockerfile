# Main idea is to build SPA and then reuse files
# Later we can add here serverside rendering in 2 or 3 stage
FROM node:8 as builder
MAINTAINER LiveEdu <engineering@liveedu.tv>

WORKDIR /srv/app
COPY . /srv/app/
RUN yarn install && yarn build

FROM alpine
WORKDIR /srv/spa/
COPY --from=builder /srv/app/build/ /srv/spa/
