import { spawn } from "child_process";

// Filter out unsupported options (like --host) programmatically
const args = process.argv.slice(2);
const filteredArgs = [];

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--host") {
    // Skip '--host' and its following argument if it's the value (e.g. 0.0.0.0 or localhost)
    if (i + 1 < args.length && !args[i + 1].startsWith("-")) {
      i++;
    }
    continue;
  }
  filteredArgs.push(args[i]);
}

// Force standard Next.js arguments for local environment matching
if (!filteredArgs.includes("--port") && !filteredArgs.includes("-p")) {
  filteredArgs.push("--port", "3000");
}
if (!filteredArgs.includes("--hostname") && !filteredArgs.includes("-H")) {
  filteredArgs.push("--hostname", "0.0.0.0");
}

console.log("Starting Next.js dev server with filtered arguments:", filteredArgs);

const nextDev = spawn("npx", ["next", "dev", ...filteredArgs], {
  stdio: "inherit",
  shell: true,
});

nextDev.on("exit", (code) => {
  process.exit(code || 0);
});
