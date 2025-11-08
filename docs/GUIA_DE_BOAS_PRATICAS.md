# Guia de Boas Práticas e Padrões - OdontoPro

Este documento detalha os padrões, convenções e boas práticas utilizadas no projeto OdontoPro. Ele serve como referência para desenvolvimento consistente e manutenção do código.

## 📚 Índice

1. [Stack Tecnológico](#stack-tecnológico)
2. [Estrutura de Pastas](#estrutura-de-pastas)
3. [Convenções de Nomenclatura](#convenções-de-nomenclatura)
4. [Server Actions](#server-actions)
5. [Data Access Layer](#data-access-layer)
6. [Componentes React](#componentes-react)
7. [Formulários e Validação](#formulários-e-validação)
8. [Autenticação](#autenticação)
9. [Database e Prisma](#database-e-prisma)
10. [Next.js 15 - App Router](#nextjs-15---app-router)
11. [TypeScript](#typescript)
12. [Estilização (Tailwind CSS)](#estilização-tailwind-css)
13. [Tratamento de Erros](#tratamento-de-erros)
14. [Exemplos Práticos](#exemplos-práticos)

---

## Stack Tecnológico

### Dependências Principais

- **Next.js**: 15.3.4 (App Router)
- **React**: 19.0.0
- **TypeScript**: 5.x
- **Prisma**: 6.13.0 (ORM)
- **NextAuth.js**: 5.0.0-beta.29 (Autenticação)
- **Zod**: 3.25.76 (Validação de schemas)
- **React Hook Form**: 7.60.0 (Gerenciamento de formulários)
- **TanStack Query**: 5.83.0 (Gerenciamento de estado server-side)
- **Tailwind CSS**: 4.x (Estilização)
- **Radix UI**: Componentes acessíveis (Dialog, Select, Label, etc.)
- **Stripe**: 18.4.0 (Pagamentos)
- **Cloudinary**: 2.7.0 (Upload de imagens)
- **date-fns**: 4.1.0 (Manipulação de datas)
- **Sonner**: 2.0.6 (Notificações/toasts)

### Configurações Importantes

- **TypeScript**: Modo strict ativado
- **Path Aliases**: `@/*` aponta para `./src/*`
- **Prisma**: Configurado com PostgreSQL
- **Imagens**: Remote patterns configurados para GitHub, Cloudinary e Google

---

## Estrutura de Pastas

O projeto segue uma estrutura organizada por features/rotas dentro do App Router:

```
src/
├── app/                          # Next.js App Router
│   ├── (panel)/                 # Grupo de rotas autenticadas
│   │   └── dashboard/           # Feature: Dashboard
│   │       ├── _actions/        # Server Actions
│   │       ├── _components/     # Componentes específicos
│   │       ├── _data-access/    # Funções de acesso a dados
│   │       └── page.tsx         # Página principal
│   ├── (public)/                # Grupo de rotas públicas
│   │   ├── _actions/            # Server Actions públicas
│   │   ├── _components/         # Componentes públicos
│   │   ├── _data_access/        # Data access públicos
│   │   └── page.tsx
│   └── api/                     # API Routes
│       ├── auth/[...nextauth]/  # NextAuth handlers
│       └── webhook/              # Webhooks (Stripe, etc.)
├── components/                   # Componentes reutilizáveis
│   ├── ui/                      # Componentes UI (shadcn/ui)
│   └── session-auth.tsx         # Provider de autenticação
├── lib/                          # Bibliotecas e utilitários
│   ├── auth.ts                  # Configuração NextAuth
│   ├── prisma.ts                 # Cliente Prisma singleton
│   ├── getSession.ts             # Helper para sessão
│   └── utils.ts                  # Utilitários gerais
├── providers/                    # React Context Providers
│   └── queryclient.tsx          # TanStack Query Provider
├── types/                        # Tipos TypeScript
│   └── prisma.ts                 # Tipos gerados do Prisma
└── utils/                        # Utilitários de negócio
    ├── formatCurrency.ts         # Formatação de moeda
    ├── convertCurrency.ts        # Conversão de moeda
    ├── formatPhone.ts            # Formatação de telefone
    └── permitions/               # Lógica de permissões
```

### Convenções de Organização

1. **Páginas (`page.tsx`)**: Devem ser Server Components por padrão
2. **Componentes específicos**: Prefixo `_components/` (não são rotas)
3. **Server Actions**: Prefixo `_actions/` (arquivos com `"use server"`)
4. **Data Access**: Prefixo `_data-access/` ou `_data_access/` (funções puras de acesso a dados)
5. **Layouts**: `layout.tsx` para layouts específicos de rotas

---

## Convenções de Nomenclatura

### Arquivos e Pastas

- **Componentes React**: PascalCase (`Button.tsx`, `DialogService.tsx`)
- **Server Actions**: camelCase (`create-service.ts`, `update-service.ts`)
- **Data Access**: camelCase (`get-reminders.ts`, `get-info-user.ts`)
- **Utilitários**: camelCase (`formatCurrency.ts`, `checkSubscription.ts`)
- **Páginas**: `page.tsx` (sempre minúsculo)
- **Layouts**: `layout.tsx` (sempre minúsculo)

### Funções e Variáveis

- **Funções**: camelCase (`createReminder`, `getReminders`)
- **Componentes**: PascalCase (`DialogService`, `ServicesList`)
- **Tipos/Interfaces**: PascalCase (`FormSchema`, `DialogServiceProps`)
- **Constantes**: UPPER_SNAKE_CASE (`TRIAL_DAYS`, `CURRENCY_FORMATTER`)

### Convenções Específicas

- **Server Actions**: Nomes devem ser verbos (`create`, `update`, `delete`, `get`)
- **Data Access**: Sempre começam com `get`, `create`, `update`, `delete`
- **Hooks customizados**: Sempre começam com `use` (`useReminderForm`, `UseDialogServiceForm`)

---

## Server Actions

### Estrutura Padrão

Todas as Server Actions devem seguir este padrão:

```typescript
"use server"

import prisma from "@/lib/prisma"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"

// 1. Definir schema de validação
const formSchema = z.object({
    description: z.string().min(1, "A descrição é obrigatória"),
})

type FormSchema = z.infer<typeof formSchema>

// 2. Função principal
export async function createReminder(formData: FormSchema) {
    // 3. Verificar autenticação
    const session = await auth()
    
    if (!session?.user?.id) {
        return {
            error: "Falha ao cadastrar lembrete",
        }
    }

    // 4. Validar dados
    const schema = formSchema.safeParse(formData)

    if (!schema.success) {
        return {
            error: schema.error.issues[0].message
        }
    }

    // 5. Executar operação
    try {
        await prisma.reminder.create({
            data: {
                description: formData.description,
                userId: session?.user?.id
            }
        })

        // 6. Revalidar cache
        revalidatePath("/dashboard")

        return {
            data: "Lembrete cadastrado com sucesso!"
        }

    } catch (err) {
        return {
            error: "Falha ao cadastrar lembrete"
        }
    }
}
```

### Regras Obrigatórias

1. **Sempre começar com `"use server"`**
2. **Validar autenticação** antes de qualquer operação
3. **Validar dados** com Zod usando `safeParse`
4. **Retornar objetos consistentes**: `{ data: ... }` ou `{ error: ... }`
5. **Usar `revalidatePath`** após mutações
6. **Tratar erros** com try/catch
7. **Não logar informações sensíveis** em produção

### Padrão de Retorno

```typescript
// Sucesso
return {
    data: "Mensagem de sucesso" | objeto
}

// Erro
return {
    error: "Mensagem de erro"
}
```

---

## Data Access Layer

### Estrutura Padrão

Funções de acesso a dados devem ser puras e focadas apenas em buscar dados:

```typescript
"use server"

import prisma from "@/lib/prisma"

export async function getReminders({ userId }: { userId: string }) {
    if (!userId) {
        return []
    }

    try {
        const reminders = await prisma.reminder.findMany({
            where: {
                userId: userId
            }
        })

        return reminders;
    } catch (err) {
        console.log(err);
        return []
    }
}
```

### Regras

1. **Prefixo `"use server"`** quando necessário (se chamado de client components)
2. **Validação de parâmetros** básica
3. **Try/catch** para tratamento de erros
4. **Retornar valores padrão** em caso de erro (array vazio, null, etc.)
5. **Não fazer validação de autenticação** (deve ser feita na camada que chama)
6. **Nomes descritivos**: `get`, `find`, `fetch`

---

## Componentes React

### Server Components vs Client Components

#### Server Components (Padrão)

```typescript
import getSession from '@/lib/getSession'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
    const session = await getSession()

    if (!session) {
        redirect("/")
    }

    return (
        <main>
            {/* Conteúdo */}
        </main>
    )
}
```

#### Client Components

```typescript
"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function ServicesList({ services }: ServicesListProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <section>
            {/* Conteúdo interativo */}
        </section>
    )
}
```

### Regras

1. **Server Components por padrão** - use `"use client"` apenas quando necessário
2. **Importar tipos** do Prisma quando necessário: `import { Service } from '@prisma/client'`
3. **Props tipadas** com interfaces TypeScript
4. **Componentes reutilizáveis** em `src/components/ui/`
5. **Componentes específicos** em `_components/` da feature

### Estrutura de Componentes

```typescript
"use client"

import { useState } from 'react'
// Imports de componentes UI
import { Button } from '@/components/ui/button'
// Imports de actions
import { deleteService } from '../_actions/delete-service'
// Imports de utilitários
import { toast } from 'sonner'
// Imports de tipos
import { Service } from '@prisma/client'

interface ServicesListProps {
    services: Service[];
    permission: ResultPermissionProp;
}

export function ServicesList({ services, permission }: ServicesListProps) {
    // 1. Estados
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // 2. Handlers
    async function handleDeleteService(serviceId: string) {
        const response = await deleteService({ serviceId })
        
        if (response.error) {
            toast.error(response.error)
            return
        }

        toast.success(response.data)
    }

    // 3. Render
    return (
        <section>
            {/* JSX */}
        </section>
    )
}
```

---

## Formulários e Validação

### Estrutura com React Hook Form + Zod

#### 1. Definir Schema de Validação (Client)

```typescript
"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const formSchema = z.object({
    name: z.string().min(1, { message: "O nome do serviço é obrigatório" }),
    price: z.string().min(1, { message: "O preço do serviço é obrigatório" }),
    hours: z.string(),
    minutes: z.string(),
})

export type DialogServiceFormData = z.infer<typeof formSchema>

export interface UseDialogServiceFormProps {
    initialValues?: {
        name: string;
        price: string;
        hours: string;
        minutes: string;
    }
}

export function UseDialogServiceForm({ initialValues }: UseDialogServiceFormProps) {
    return useForm<DialogServiceFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues || {
            name: "",
            price: "",
            hours: "",
            minutes: ""
        }
    })
}
```

#### 2. Usar o Form no Componente

```typescript
"use client"

import { UseDialogServiceForm, DialogServiceFormData } from "./dialog-service-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function DialogService({ closeModal, serviceId, initialValues }: DialogServiceProps) {
    const form = UseDialogServiceForm({ initialValues })
    const [loading, setLoading] = useState(false)

    async function onSubmit(values: DialogServiceFormData) {
        setLoading(true)
        
        // Transformar dados antes de enviar
        const priceInCents = convertRealToCents(values.price)
        const duration = (parseInt(values.hours) || 0) * 60 + (parseInt(values.minutes) || 0)

        const response = await createNewService({
            name: values.name,
            price: priceInCents,
            duration: duration
        })

        setLoading(false)

        if (response.error) {
            toast.error(response.error)
            return
        }

        toast.success("Serviço cadastrado com sucesso")
        form.reset()
        closeModal()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome do Serviço</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite o nome..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? "Cadastrando..." : "Cadastrar"}
                </Button>
            </form>
        </Form>
    )
}
```

### Regras

1. **Sempre usar Zod** para validação de schemas
2. **Resolver com `zodResolver`** do `@hookform/resolvers`
3. **Mensagens de erro em português** e descritivas
4. **Loading states** durante submissão
5. **Feedback visual** com toast (Sonner)
6. **Reset do form** após sucesso
7. **Transformação de dados** antes de enviar (se necessário)

---

## Autenticação

### Configuração NextAuth

```typescript
// src/lib/auth.ts
import NextAuth from "next-auth"
import prisma from "./prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Adapter } from "next-auth/adapters"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma) as Adapter,
    trustHost: true,
    providers: [GitHub, Google],
})
```

### Helper de Sessão

```typescript
// src/lib/getSession.ts
import { auth } from './auth'

export default auth;
```

### Uso em Server Components

```typescript
import getSession from '@/lib/getSession'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
    const session = await getSession()

    if (!session) {
        redirect("/")
    }

    // Usar session.user.id, session.user.email, etc.
}
```

### Uso em Server Actions

```typescript
"use server"

import { auth } from "@/lib/auth"

export async function createReminder(formData: FormSchema) {
    const session = await auth()

    if (!session?.user?.id) {
        return {
            error: "Não autorizado"
        }
    }

    // Usar session.user.id
}
```

---

## Database e Prisma

### Cliente Prisma Singleton

```typescript
// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client"

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    let globalWithPrisma = global as typeof globalThis & {
        prisma: PrismaClient
    }

    if (!globalWithPrisma.prisma) {
        globalWithPrisma.prisma = new PrismaClient()
    }

    prisma = globalWithPrisma.prisma
}

export default prisma
```

### Uso em Server Actions e Data Access

```typescript
import prisma from "@/lib/prisma"

export async function getReminders({ userId }: { userId: string }) {
    const reminders = await prisma.reminder.findMany({
        where: {
            userId: userId
        }
    })

    return reminders
}
```

### Regras

1. **Sempre usar o singleton** de `src/lib/prisma.ts`
2. **Incluir relacionamentos** quando necessário: `include: { subscription: true }`
3. **Usar tipos gerados** do Prisma: `import { Service } from '@prisma/client'`
4. **Tipos customizados** para relacionamentos em `src/types/prisma.ts`

---

## Next.js 15 - App Router

### Estrutura de Rotas

- **Route Groups**: `(panel)` e `(public)` para organizar rotas
- **Dynamic Routes**: `[id]` para rotas dinâmicas
- **API Routes**: Em `app/api/`

### Metadata

```typescript
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Odonto PRO - Título",
    description: "Descrição",
    robots: {
        index: true,
        follow: true,
        nocache: true,
    },
    openGraph: {
        title: "Título",
        description: "Descrição",
        images: [{ url: `${process.env.NEXT_PUBLIC_APP_URL}/image.png` }],
    },
}
```

### Revalidação

```typescript
// Revalidação por tempo (ISR)
export const revalidate = 120 // 2 minutos

// Revalidação manual em Server Actions
revalidatePath("/dashboard")
```

### Suspense

```typescript
import { Suspense } from 'react'

export default async function Services() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <ServicesContent userId={session.user?.id!} />
        </Suspense>
    )
}
```

### Redirects

```typescript
import { redirect } from 'next/navigation'

export default async function Dashboard() {
    const session = await getSession()

    if (!session) {
        redirect("/")
    }
}
```

---

## TypeScript

### Configuração

- **Modo strict**: Ativado
- **Path aliases**: `@/*` → `./src/*`
- **Tipos do React**: 19.x

### Tipos e Interfaces

```typescript
// Tipos inferidos de Zod
type FormSchema = z.infer<typeof formSchema>

// Interfaces para Props
interface ServicesListProps {
    services: Service[];
    permission: ResultPermissionProp;
}

// Tipos de retorno
export type PLAN_PROP = "BASIC" | "PROFESSIONAL" | "TRIAL" | "EXPIRED"

// Tipos do Prisma
import { Service, Appointment } from '@prisma/client'
```

### Regras

1. **Sempre tipar props** de componentes
2. **Usar tipos inferidos** do Zod quando possível
3. **Evitar `any`** - usar `unknown` se necessário
4. **Tipos do Prisma** importados de `@prisma/client`
5. **Non-null assertion** (`!`) apenas quando necessário e seguro

---

## Estilização (Tailwind CSS)

### Configuração

- **Tailwind CSS 4.x**
- **Classes utilitárias** para estilização
- **Componentes UI** baseados em Radix UI + Tailwind

### Padrões de Uso

```typescript
// Classes condicionais
className={cn(
    "base-classes",
    condition && "conditional-classes",
    className // Para sobrescrever via props
)}

// Variantes com CVA
const buttonVariants = cva(
    "base-classes",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground",
                destructive: "bg-destructive text-white",
            },
            size: {
                default: "h-9 px-4",
                sm: "h-8 px-3",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)
```

### Responsividade

```typescript
// Mobile-first
<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
    {/* Conteúdo */}
</div>
```

### Regras

1. **Mobile-first**: Sempre começar com classes mobile
2. **Usar `cn()`** para combinar classes condicionalmente
3. **Componentes UI** reutilizáveis em `src/components/ui/`
4. **Dark mode** suportado via classes do Tailwind

---

## Tratamento de Erros

### Server Actions

```typescript
try {
    await prisma.reminder.create({ data: {...} })
    revalidatePath("/dashboard")
    return { data: "Sucesso" }
} catch (err) {
    console.log(err) // Apenas em desenvolvimento
    return { error: "Mensagem amigável ao usuário" }
}
```

### Client Components

```typescript
async function handleDelete(serviceId: string) {
    const response = await deleteService({ serviceId })
    
    if (response.error) {
        toast.error(response.error)
        return
    }

    toast.success(response.data)
}
```

### Data Access

```typescript
try {
    const data = await prisma.service.findMany()
    return data
} catch (err) {
    console.log(err)
    return [] // Valor padrão seguro
}
```

### Regras

1. **Mensagens amigáveis** ao usuário (não expor erros técnicos)
2. **Logs apenas em desenvolvimento** (`console.log`)
3. **Valores padrão seguros** em caso de erro
4. **Feedback visual** com toast (Sonner)

---

## Exemplos Práticos

### Exemplo Completo: Criar um Novo Recurso

#### 1. Schema Prisma

```prisma
model Task {
  id        String   @id @default(uuid())
  title     String
  completed Boolean  @default(false)
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### 2. Server Action

```typescript
// src/app/(panel)/dashboard/tasks/_actions/create-task.ts
"use server"

import prisma from "@/lib/prisma"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"

const formSchema = z.object({
    title: z.string().min(1, "O título é obrigatório"),
})

type FormSchema = z.infer<typeof formSchema>

export async function createTask(formData: FormSchema) {
    const session = await auth()

    if (!session?.user?.id) {
        return {
            error: "Não autorizado",
        }
    }

    const schema = formSchema.safeParse(formData)

    if (!schema.success) {
        return {
            error: schema.error.issues[0].message
        }
    }

    try {
        await prisma.task.create({
            data: {
                title: formData.title,
                userId: session.user.id
            }
        })

        revalidatePath("/dashboard/tasks")

        return {
            data: "Tarefa criada com sucesso!"
        }
    } catch (err) {
        return {
            error: "Falha ao criar tarefa"
        }
    }
}
```

#### 3. Data Access

```typescript
// src/app/(panel)/dashboard/tasks/_data-access/get-tasks.ts
"use server"

import prisma from "@/lib/prisma"

export async function getTasks({ userId }: { userId: string }) {
    if (!userId) {
        return []
    }

    try {
        const tasks = await prisma.task.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return tasks
    } catch (err) {
        console.log(err)
        return []
    }
}
```

#### 4. Schema de Form (Client)

```typescript
// src/app/(panel)/dashboard/tasks/_components/task-form.tsx
"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const taskSchema = z.object({
    title: z.string().min(1, "O título é obrigatório"),
})

export type TaskFormData = z.infer<typeof taskSchema>

export function useTaskForm() {
    return useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: ""
        }
    })
}
```

#### 5. Componente de Form

```typescript
// src/app/(panel)/dashboard/tasks/_components/task-form-dialog.tsx
"use client"

import { useState } from 'react'
import { useTaskForm, TaskFormData } from './task-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createTask } from '../_actions/create-task'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function TaskFormDialog({ closeModal }: { closeModal: () => void }) {
    const form = useTaskForm()
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function onSubmit(values: TaskFormData) {
        setLoading(true)

        const response = await createTask(values)

        setLoading(false)

        if (response.error) {
            toast.error(response.error)
            return
        }

        toast.success(response.data)
        form.reset()
        closeModal()
        router.refresh()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título da Tarefa</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite o título..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Criando..." : "Criar Tarefa"}
                </Button>
            </form>
        </Form>
    )
}
```

#### 6. Página

```typescript
// src/app/(panel)/dashboard/tasks/page.tsx
import getSession from '@/lib/getSession'
import { redirect } from 'next/navigation'
import { getTasks } from './_data-access/get-tasks'
import { TasksList } from './_components/tasks-list'

export default async function TasksPage() {
    const session = await getSession()

    if (!session) {
        redirect("/")
    }

    const tasks = await getTasks({ userId: session.user?.id! })

    return (
        <main>
            <TasksList tasks={tasks} />
        </main>
    )
}
```

---

## Checklist de Desenvolvimento

Ao criar uma nova feature, verifique:

- [ ] Schema Prisma atualizado (se necessário)
- [ ] Server Actions com validação de autenticação
- [ ] Server Actions com validação Zod
- [ ] Server Actions retornando `{ data }` ou `{ error }`
- [ ] `revalidatePath` após mutações
- [ ] Data Access functions puras
- [ ] Componentes tipados com TypeScript
- [ ] Formulários com React Hook Form + Zod
- [ ] Loading states durante operações
- [ ] Feedback visual com toast
- [ ] Tratamento de erros adequado
- [ ] Responsividade mobile-first
- [ ] Estrutura de pastas correta (`_actions`, `_components`, `_data-access`)

---

## Recursos Adicionais

- **Documentação Next.js**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Zod Docs**: https://zod.dev
- **React Hook Form**: https://react-hook-form.com
- **Radix UI**: https://www.radix-ui.com
- **Tailwind CSS**: https://tailwindcss.com

---

**Última atualização**: Janeiro 2025
**Versão do projeto**: 0.1.0

