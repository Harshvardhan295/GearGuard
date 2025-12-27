import { useState } from "react";
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

interface MaintenanceFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

export function MaintenanceForm({ onSubmit, onCancel }: MaintenanceFormProps) {
  const [status, setStatus] = useState<MaintenanceStatus>('new');
  const [maintenanceType, setMaintenanceType] = useState<MaintenanceType>('corrective');
  const [priority, setPriority] = useState(0);

  return (
    <div className="space-y-6">
      <StatusPipeline currentStatus={status} onStatusChange={setStatus} />

      <Card>
        <CardHeader>
          <CardTitle>Maintenance Request Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Enter maintenance subject" />
            </div>
            <div className="space-y-2">
              <Label>Created By</Label>
              <Input value="Mitchell Admin" disabled />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Maintenance Type</Label>
            <RadioGroup 
              value={maintenanceType} 
              onValueChange={(v) => setMaintenanceType(v as MaintenanceType)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="corrective" id="corrective" />
                <Label htmlFor="corrective" className="cursor-pointer">Corrective</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="preventive" id="preventive" />
                <Label htmlFor="preventive" className="cursor-pointer">Preventive</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Equipment</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select equipment" />
                </SelectTrigger>
                <SelectContent>
                  {mockEquipment.map((eq) => (
                    <SelectItem key={eq.id} value={eq.id}>{eq.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Work Center</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select work center" />
                </SelectTrigger>
                <SelectContent>
                  {mockWorkCenters.map((wc) => (
                    <SelectItem key={wc.id} value={wc.id}>{wc.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Team</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  {mockTeams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Technician</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select technician" />
                </SelectTrigger>
                <SelectContent>
                  {mockUsers.filter(u => u.role === 'technician' || u.role === 'admin').map((user) => (
                    <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="scheduledDate">Scheduled Date</Label>
              <Input id="scheduledDate" type="datetime-local" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (hours)</Label>
              <Input id="duration" type="number" min="0" step="0.5" placeholder="2.0" />
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <div className="flex gap-1 pt-2">
                {[1, 2, 3].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setPriority(star === priority ? 0 : star)}
                    className="focus:outline-none"
                  >
                    <Star 
                      className={`h-5 w-5 ${star <= priority ? 'fill-chart-1 text-chart-1' : 'text-muted-foreground'}`} 
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Tabs defaultValue="notes">
            <TabsList>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
            </TabsList>
            <TabsContent value="notes" className="mt-4">
              <Textarea placeholder="Add notes about this maintenance request..." rows={4} />
            </TabsContent>
            <TabsContent value="instructions" className="mt-4">
              <Textarea placeholder="Add instructions for the technician..." rows={4} />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onCancel}>Cancel</Button>
            <Button onClick={() => onSubmit?.({})}>Save Request</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
