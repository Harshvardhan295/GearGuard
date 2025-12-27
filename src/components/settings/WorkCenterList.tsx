import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { mockWorkCenters } from "@/data/mockData";
import { Plus, Search } from "lucide-react";

export function WorkCenterList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredWorkCenters = mockWorkCenters.filter(wc => 
    wc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wc.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Work Centers</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Work Center
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>New Work Center</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="wcName">Name</Label>
                    <Input id="wcName" placeholder="Enter name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wcCode">Code</Label>
                    <Input id="wcCode" placeholder="Enter code" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wcTag">Tag</Label>
                  <Input id="wcTag" placeholder="Enter tag" />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="costPerHour">Cost per Hour</Label>
                    <Input id="costPerHour" type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity Efficiency (%)</Label>
                    <Input id="capacity" type="number" placeholder="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="oee">OEE Target (%)</Label>
                    <Input id="oee" type="number" placeholder="90" />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsDialogOpen(false)}>Save Work Center</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search work centers..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Tag</TableHead>
              <TableHead className="text-right">Cost/Hour</TableHead>
              <TableHead className="text-right">Capacity (%)</TableHead>
              <TableHead className="text-right">OEE Target (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWorkCenters.map((wc) => (
              <TableRow key={wc.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium">{wc.name}</TableCell>
                <TableCell className="font-mono">{wc.code}</TableCell>
                <TableCell>{wc.tag || '-'}</TableCell>
                <TableCell className="text-right">${wc.costPerHour.toFixed(2)}</TableCell>
                <TableCell className="text-right">{wc.capacityEfficiency.toFixed(2)}%</TableCell>
                <TableCell className="text-right">{wc.oeeTarget.toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
