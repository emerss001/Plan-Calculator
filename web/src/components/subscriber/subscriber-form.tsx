import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PatternFormat } from "react-number-format";

// O schema e o tipo ficam juntos do formulário que os utiliza
const formSchema = z.object({
    name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
    phone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido"),
    email: z.string().email("Email inválido"),
});

export type SubscriberFormData = z.infer<typeof formSchema>;

interface SubscriberFormProps {
    onSubmit: (data: SubscriberFormData) => void;
    isPending: boolean;
}

const SubscriberForm = ({ onSubmit, isPending }: SubscriberFormProps) => {
    const navigate = useNavigate();
    const form = useForm<SubscriberFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome Completo</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite seu nome completo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                                <PatternFormat
                                    {...field}
                                    format="(##) #####-####"
                                    mask="_"
                                    customInput={Input}
                                    placeholder="(99) 99999-9999"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="exemplo@exemplo.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-4 pt-6">
                    <Button type="button" variant="ghost" onClick={() => navigate(-1)} className="flex-1">
                        Voltar
                    </Button>
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-primary to-accent"
                    >
                        {isPending ? "Salvando..." : "Contratar"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default SubscriberForm;
