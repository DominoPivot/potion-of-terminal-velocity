import { context } from "esbuild";
const ctx = await context({
	bundle: true,
	format: "esm",
	target: [ "es2020", "chrome99", "edge99", "firefox97", "safari15.4"	], // CSS layers
	entryPoints: [
		"src/entrypoint.ts",
		"src/entrypoint.css",
	],
	logLevel: "info",
	minify: true,
	outdir: "docs",
	outbase: "src",
	sourcemap: true
});

await ctx.serve({
	servedir: "docs"
});
