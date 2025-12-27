import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusPipeline } from "./StatusPipeline";
import { mockEquipment, mockTeams, mockUsers, mockWorkCenters } from "@/data/mockData";
import { MaintenanceStatus, MaintenanceType } from "@/types";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MaintenanceFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

export function MaintenanceForm({ onSubmit, onCancel }: MaintenanceFormProps) {
  // UI State
  const [status, setStatus] = useState<MaintenanceStatus>('new');
  const [maintenanceType, setMaintenanceType] = useState<MaintenanceType>('corrective');
  const [priority, setPriority] = useState(0);
  const { toast } = useToast();

  // Smart Feature State: Auto-fill logic
  const [selectedEqId, setSelectedEqId] = useState<string>("");
  const [autoTeamId, setAutoTeamId] = useState<string>("");

  // Business Logic: Automatically fetch Team from Equipment record
  useEffect(() => {
    if (selectedEqId) {
      const equipment = mockEquipment.find(e => e.id === selectedEqId);
      if (equipment?.maintenanceTeamId) {
        setAutoTeamId(equipment.maintenanceTeamId);
        toast({
          title: "Smart Assignment",
          description: `Automatically assigned to the ${mockTeams.find(t => t.id === equipment.maintenanceTeamId)?.name} based on equipment records.`,
        });
      }
    }
  }, [selectedEqId, toast]);

  return (
    <div className="space-y-6">
      {/* Workflow Indicator */}
      <StatusPipeline currentStatus={status} onStatusChange={setStatus} />

      <Card className="shadow-sm border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Maintenance Request Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Section 1: Subject & Submitter */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="subject" className="font-semibold">Subject</Label>
              <Input id="subject" placeholder="e.g., Hydraulic Leak or Annual Inspection" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Created By</Label>
              <Input value="Mitchell Admin" disabled className="bg-muted/50 border-dashed" />
            </div>
          </div>

          {/* Section 2: Request Type */}
          <div className="space-y-3 p-4 rounded-lg bg-muted/20 border border-dashed">
            <Label className="font-semibold">Maintenance Type</Label>
            <RadioGroup 
              value={maintenanceType} 
              onValueChange={(v) => setMaintenanceType(v as MaintenanceType)}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="corrective" id="corrective" />
                <Label htmlFor="corrective" className="cursor-pointer font-medium">Corrective (Breakdown)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="preventive" id="preventive" />
                <Label htmlFor="preventive" className="cursor-pointer font-medium">Preventive (Routine)</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Section 3: Asset & Location */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="font-semibold">Equipment</Label>
              <Select onValueChange={setSelectedEqId} value={selectedEqId}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Identify the asset..." />
                </SelectTrigger>
                <SelectContent>
                  {mockEquipment.map((eq) => (
                    <SelectItem key={eq.id} value={eq.id}>{eq.name} ({eq.serialNumber})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-semibold">Work Center</Label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select production line..." />
                </SelectTrigger>
                <SelectContent>
                  {mockWorkCenters.map((wc) => (
                    <SelectItem key={wc.id} value={wc.id}>{wc.name} [{wc.code}]</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Section 4: Responsible Parties (With Auto-fill Support) */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="font-semibold">Maintenance Team</Label>
              <Select value={autoTeamId} onValueChange={setAutoTeamId}>
                <SelectTrigger className={autoTeamId ? "border-primary/50 bg-primary/5" : "bg-background"}>
                  <SelectValue placeholder="Assign a team..." />
                </SelectTrigger>
                <SelectContent>
                  {mockTeams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-semibold">Technician</Label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select individual..." />
                </SelectTrigger>
                <SelectContent>
                  {mockUsers.filter(u => u.role === 'technician' || u.role === 'admin').map((user) => (
                    <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Section 5: Schedule & Priority */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="scheduledDate" className="font-semibold">Scheduled Date</Label>
              <Input id="scheduledDate" type="datetime-local" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration" className="font-semibold">Est. Duration (hrs)</Label>
              <Input id="duration" type="number" min="0" step="0.5" placeholder="2.0" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label className="font-semibold">Priority Level</Label>
              <div className="flex gap-2 pt-1">
                {[1, 2, 3].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setPriority(star === priority ? 0 : star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star 
                      className={`h-6 w-6 ${star <= priority ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} 
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 6: Additional Information */}
          <Tabs defaultValue="notes" className="w-full">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="notes">Internal Notes</TabsTrigger>
              <TabsTrigger value="instructions">Technical Instructions</TabsTrigger>
            </TabsList>
            <TabsContent value="notes" className="mt-4">
              <Textarea 
                placeholder="Add context about the breakdown or specific parts needed..." 
                rows={4} 
                className="bg-background resize-none"
              />
            </TabsContent>
            <TabsContent value="instructions" className="mt-4">
              <Textarea 
                placeholder="List technical steps for the technician to follow..." 
                rows={4} 
                className="bg-background resize-none"
              />
            </TabsContent>
          </Tabs>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onCancel} className="px-6">Cancel</Button>
            <Button onClick={() => onSubmit?.({})} className="px-8 shadow-sm">Save Request</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}