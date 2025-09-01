import fastify from "fastify";
import cors from "@fastify/cors";


const server = fastify({ logger: true });

server.register(cors, {
    origin: "*",
    methods: ["GET"],
})

const team = [
  { id: 1, name: "McLaren", base: "reino unido" },
  { id: 2, name: "ferrari", base: "italia" },
  { id: 3, name: "mercedes", base: "alemanha" },
];

const drivers = [
  { id: 1, name: "leclerc", team: "ferrari" },
  { id: 2, name: "luis ramilton", team: "uno" },
  { id: 3, name: "verstappen", team: "red bull" },
];

server.get("/teans", async (req, res) => {
  res.type("application/json").code(200);

  return { team };
});

server.get("/drivers", async (req, res) => {
  res.type("application/json").code(200);

  return { drivers };
});

interface driveparam {
  id: string;
}

server.get<{ Params: driveparam }>("/drivers/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const driver = drivers.find((d) => d.id === id);

  if (!driver) {
    res.type("application/json").code(404);
    return { message: "driver not found" };
  } else {
    res.type("application/json").code(200);
    return { driver };
  }
});

server.listen({ port: 3333 }, () => {
  console.log("server is running on");
});


