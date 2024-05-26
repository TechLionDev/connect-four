import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import GameBoard from "./game-board";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { HelpCircleIcon } from "lucide-react";

function RulesPage() {
  return (
    <>
      <Dialog defaultOpen>
        <div className="flex justify-end gap-2 m-4">
          <DialogTrigger asChild>
            <Button variant={"outline"} size="icon">
              <HelpCircleIcon className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </DialogTrigger>
          <ModeToggle />
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>How To Play Connect Four</DialogTitle>
          </DialogHeader>
          <ol className='list-disc ml-8 space-y-4 py-4'>
            <li>
              Connect 4 pieces in a row (horizontally, vertically, or diagonaly)
              to win.
            </li>
            <li>Click on a column to drop a piece.</li>
          </ol>
        </DialogContent>
      </Dialog>
      <GameBoard />
    </>
  );
}

export default RulesPage;
