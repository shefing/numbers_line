import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { useNumbersLineContext } from "../context/numbersLineContext";
import { useAction } from "../hooks/useAction";

const Reload = () => {
  const { openReloadDialog, setOpenReloadDialog } = useNumbersLineContext();
  const { initialization } = useAction();

  return (
    <>
      <AlertDialog open={openReloadDialog} onOpenChange={setOpenReloadDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>?אתם רוצים להתחיל מחדש</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>הישארו</AlertDialogCancel>
            <AlertDialogAction onClick={initialization}>מחק הכל</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Reload;
