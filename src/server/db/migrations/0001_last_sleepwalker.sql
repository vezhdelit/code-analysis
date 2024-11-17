ALTER TABLE "tasks" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "updatedAt" SET NOT NULL;