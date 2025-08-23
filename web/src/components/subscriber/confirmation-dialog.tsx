import { AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

interface ConfirmationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
}

const ConfirmationDialog = ({ open, onOpenChange, onConfirm }: ConfirmationDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader className="text-center pb-4">
                    <div className="flex flex-col items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
                            <AlertTriangle className="w-8 h-8 text-yellow-500" />
                        </div>
                        <DialogTitle className="text-2xl font-bold">Confirmar Contratação</DialogTitle>
                    </div>
                </DialogHeader>

                <div className="px-2 pb-6 text-center">
                    <p className="text-muted-foreground leading-relaxed mb-6">
                        Ao confirmar, você concorda com os termos e o contrato será gerado. Esta ação não poderá ser
                        desfeita.
                    </p>

                    <DialogFooter className="gap-3 sm:gap-3">
                        <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                            Cancelar
                        </Button>
                        <Button onClick={onConfirm} className="flex-1 bg-gradient-to-r from-primary to-accent">
                            Salvar Contrato
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmationDialog;
