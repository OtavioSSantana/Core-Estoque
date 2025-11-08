'use client';

import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  Bell, 
  Shield, 
  Palette, 
  Save,
  Mail,
  Smartphone,
  Monitor,
  Globe
} from 'lucide-react';

export default function Configuracoes() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie as configurações do sistema e preferências
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Building className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Informações da Empresa</h2>
            </div>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nome da Empresa</Label>
                  <Input id="companyName" defaultValue="Core Estoque LTDA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input id="cnpj" defaultValue="12.345.678/0001-90" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Principal</Label>
                  <Input id="email" type="email" defaultValue="contato@coreestoque.com.br" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone Principal</Label>
                  <Input id="phone" defaultValue="(11) 9876-5432" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço da Matriz</Label>
                <Input id="address" defaultValue="Rua das Empresas, 123 - São Paulo, SP" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Configurações Regionais</h2>
            </div>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Input id="timezone" defaultValue="America/Sao_Paulo (GMT-3)" readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Moeda</Label>
                  <Input id="currency" defaultValue="Real (BRL)" readOnly />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Preferências de Notificação</h2>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications" className="text-base">
                    <Mail className="w-4 h-4 inline-block mr-2" />
                    Notificações por Email
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receba alertas importantes por email
                  </p>
                </div>
                <Switch id="emailNotifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="smsNotifications" className="text-base">
                    <Smartphone className="w-4 h-4 inline-block mr-2" />
                    Notificações por SMS
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receba alertas críticos por SMS
                  </p>
                </div>
                <Switch id="smsNotifications" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="browserNotifications" className="text-base">
                    <Monitor className="w-4 h-4 inline-block mr-2" />
                    Notificações do Navegador
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações em tempo real no navegador
                  </p>
                </div>
                <Switch id="browserNotifications" defaultChecked />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Tipos de Alertas</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="lowStock">Estoque Baixo</Label>
                <Switch id="lowStock" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="newSales">Novas Vendas</Label>
                <Switch id="newSales" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="transfers">Transferências de Estoque</Label>
                <Switch id="transfers" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="newUsers">Novos Usuários</Label>
                <Switch id="newUsers" />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Configurações de Segurança</h2>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="twoFactor" className="text-base">
                    Autenticação de Dois Fatores
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Adicione uma camada extra de segurança à sua conta
                  </p>
                </div>
                <Switch id="twoFactor" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sessionTimeout" className="text-base">
                    Timeout de Sessão
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Desconectar automaticamente após inatividade
                  </p>
                </div>
                <Switch id="sessionTimeout" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ipRestriction" className="text-base">
                    Restrição por IP
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Permitir acesso apenas de IPs autorizados
                  </p>
                </div>
                <Switch id="ipRestriction" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Política de Senhas</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minLength">Comprimento Mínimo</Label>
                  <Input id="minLength" type="number" defaultValue="8" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiration">Expiração (dias)</Label>
                  <Input id="expiration" type="number" defaultValue="90" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch id="requireUpper" defaultChecked />
                  <Label htmlFor="requireUpper">Maiúsculas</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="requireNumber" defaultChecked />
                  <Label htmlFor="requireNumber">Números</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="requireSpecial" defaultChecked />
                  <Label htmlFor="requireSpecial">Caracteres Especiais</Label>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Aparência e Tema</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Tema do Sistema</Label>
                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" className="justify-start">
                    ☀️ Claro
                  </Button>
                  <Button variant="outline" className="justify-start">
                    🌙 Escuro
                  </Button>
                  <Button variant="outline" className="justify-start">
                    💻 Sistema
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Cor Principal</Label>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-md bg-primary cursor-pointer border-2 border-primary" />
                  <div className="w-10 h-10 rounded-md bg-green-500 cursor-pointer border-2 border-transparent hover:border-green-500" />
                  <div className="w-10 h-10 rounded-md bg-blue-500 cursor-pointer border-2 border-transparent hover:border-blue-500" />
                  <div className="w-10 h-10 rounded-md bg-yellow-500 cursor-pointer border-2 border-transparent hover:border-yellow-500" />
                  <div className="w-10 h-10 rounded-md bg-red-500 cursor-pointer border-2 border-transparent hover:border-red-500" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compactMode" className="text-base">
                    Modo Compacto
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Reduzir espaçamentos para ver mais informações
                  </p>
                </div>
                <Switch id="compactMode" />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
}