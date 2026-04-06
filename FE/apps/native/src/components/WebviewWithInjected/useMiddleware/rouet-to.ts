import { MessageEventRequestData } from "@/src/types/bridge";
import { Href, router } from "expo-router";

const isRoutablePath = (value: string): value is Extract<Href, string> => {
  return (
    value.startsWith("/") || value.startsWith("./") || value.startsWith("../")
  );
};

//TODO: 구현 및 리팩토링 필요
const routeTo = ({ name, method, body }: MessageEventRequestData) => {
  if (
    name === "route-to" &&
    method === "POST" &&
    typeof body === "object" &&
    body !== null &&
    "path" in body &&
    "routeType" in body &&
    typeof body.path === "string" &&
    (body.routeType === "push" || body.routeType === "replace")
  ) {
    const { path, routeType } = body;
    if (!isRoutablePath(path)) return;

    if (routeType === "push") {
      router.push(path);
    } else {
      router.replace(path);
    }
  }
};

export default routeTo;
