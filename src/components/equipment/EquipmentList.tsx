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
import { mockEquipment, mockCategories, mockUsers } from "@/data/mockData";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";

export function EquipmentList() {
  const [searchTerm, setSearchTerm] = useState("");

  const getCategoryName = (id: string) => {
    return mockCategories.find(c => c.id === id)?.name || '-';
  };

  const getEmployeeName = (id?: string) => {
    if (!id) return '-';
    return mockUsers.find(u => u.id === id)?.name || '-';
  };

  const getTechnicianName = (id?: string) => {
    if (!id) return '-';
    return mockUsers.find(u => u.id === id)?.name || '-';
  };

  const filteredEquipment = mockEquipment.filter(eq => 
    eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eq.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Equipment</CardTitle>
          <Button asChild>
            <Link to="/equipment/new">
              <Plus className="h-4 w-4 mr-2" />
              New Equipment
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search equipment..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Equipment Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Serial Number</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Technician</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEquipment.map((equipment) => (
              <TableRow key={equipment.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium">{equipment.name}</TableCell>
                <TableCell>{getCategoryName(equipment.categoryId)}</TableCell>
                <TableCell className="font-mono text-sm">{equipment.serialNumber || '-'}</TableCell>
                <TableCell>{getEmployeeName(equipment.employeeId)}</TableCell>
                <TableCell>{getTechnicianName(equipment.technicianId)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
