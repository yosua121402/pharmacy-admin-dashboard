
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Medicine {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: string;
  supplier: string;
  expiry: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

const medicinesData: Medicine[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    category: 'Pain Relief',
    stock: 250,
    price: '$5.99',
    supplier: 'MediSupply Inc.',
    expiry: '2025-06-15',
    status: 'in-stock',
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    category: 'Antibiotics',
    stock: 120,
    price: '$12.50',
    supplier: 'PharmaWholesale Ltd.',
    expiry: '2024-11-30',
    status: 'in-stock',
  },
  {
    id: '3',
    name: 'Cetirizine 10mg',
    category: 'Antihistamines',
    stock: 15,
    price: '$8.75',
    supplier: 'MediSupply Inc.',
    expiry: '2024-08-22',
    status: 'low-stock',
  },
  {
    id: '4',
    name: 'Ibuprofen 400mg',
    category: 'Pain Relief',
    stock: 200,
    price: '$6.49',
    supplier: 'PharmaWholesale Ltd.',
    expiry: '2025-03-10',
    status: 'in-stock',
  },
  {
    id: '5',
    name: 'Omeprazole 20mg',
    category: 'Gastrointestinal',
    stock: 0,
    price: '$15.25',
    supplier: 'MediCare Distributions',
    expiry: '2024-12-05',
    status: 'out-of-stock',
  },
  {
    id: '6',
    name: 'Loratadine 10mg',
    category: 'Antihistamines',
    stock: 85,
    price: '$9.99',
    supplier: 'MediSupply Inc.',
    expiry: '2025-02-18',
    status: 'in-stock',
  },
  {
    id: '7',
    name: 'Aspirin 75mg',
    category: 'Pain Relief',
    stock: 10,
    price: '$4.50',
    supplier: 'PharmaWholesale Ltd.',
    expiry: '2024-09-30',
    status: 'low-stock',
  },
  {
    id: '8',
    name: 'Simvastatin 20mg',
    category: 'Cardiovascular',
    stock: 65,
    price: '$18.75',
    supplier: 'MediCare Distributions',
    expiry: '2025-01-15',
    status: 'in-stock',
  },
  {
    id: '9',
    name: 'Metformin 500mg',
    category: 'Diabetes',
    stock: 45,
    price: '$11.25',
    supplier: 'MediSupply Inc.',
    expiry: '2024-10-08',
    status: 'in-stock',
  },
  {
    id: '10',
    name: 'Tramadol 50mg',
    category: 'Pain Relief',
    stock: 0,
    price: '$14.99',
    supplier: 'PharmaWholesale Ltd.',
    expiry: '2024-11-22',
    status: 'out-of-stock',
  },
];

const Medicines = () => {
  const [data, setData] = useState<Medicine[]>(medicinesData);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    category: '',
    stock: '',
    price: '',
    supplier: '',
    expiry: '',
  });
  const { toast } = useToast();

  const handleAddMedicine = () => {
    if (!newMedicine.name || !newMedicine.category || !newMedicine.stock || !newMedicine.price || !newMedicine.supplier || !newMedicine.expiry) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const stock = parseInt(newMedicine.stock);
    let status: Medicine['status'] = 'in-stock';
    
    if (stock <= 0) {
      status = 'out-of-stock';
    } else if (stock <= 20) {
      status = 'low-stock';
    }

    const newItem: Medicine = {
      id: (data.length + 1).toString(),
      name: newMedicine.name,
      category: newMedicine.category,
      stock: stock,
      price: newMedicine.price.startsWith('$') ? newMedicine.price : `$${newMedicine.price}`,
      supplier: newMedicine.supplier,
      expiry: newMedicine.expiry,
      status,
    };

    setData([newItem, ...data]);
    setNewMedicine({
      name: '',
      category: '',
      stock: '',
      price: '',
      supplier: '',
      expiry: '',
    });
    setShowAddDialog(false);
    
    toast({
      title: "Success",
      description: "Medicine added successfully",
    });
  };

  const columns = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
    },
    {
      key: 'stock',
      header: 'Stock',
      sortable: true,
    },
    {
      key: 'price',
      header: 'Price',
      sortable: true,
    },
    {
      key: 'supplier',
      header: 'Supplier',
      sortable: true,
    },
    {
      key: 'expiry',
      header: 'Expiry Date',
      sortable: true,
      cell: (medicine: Medicine) => {
        const date = new Date(medicine.expiry);
        return date.toLocaleDateString();
      },
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      cell: (medicine: Medicine) => {
        const variants = {
          'in-stock': 'bg-green-100 text-green-800',
          'low-stock': 'bg-yellow-100 text-yellow-800',
          'out-of-stock': 'bg-red-100 text-red-800',
        };
        
        const labels = {
          'in-stock': 'In Stock',
          'low-stock': 'Low Stock',
          'out-of-stock': 'Out of Stock',
        };
        
        return (
          <Badge variant="outline" className={variants[medicine.status]}>
            {labels[medicine.status]}
          </Badge>
        );
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (medicine: Medicine) => (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Edit
          </Button>
          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleRowClick = (medicine: Medicine) => {
    toast({
      title: medicine.name,
      description: `Category: ${medicine.category}, Stock: ${medicine.stock}`,
    });
  };

  return (
    <DashboardLayout>
      <DashboardHeader 
        title="Medicines" 
        subtitle="Manage your pharmacy inventory" 
        className="mb-6"
      />
      
      <div className="flex justify-end mb-6">
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Medicine
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Medicine</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new medicine to inventory.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Medicine Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Paracetamol 500mg"
                    value={newMedicine.name}
                    onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newMedicine.category}
                    onValueChange={(value) => setNewMedicine({ ...newMedicine, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pain Relief">Pain Relief</SelectItem>
                      <SelectItem value="Antibiotics">Antibiotics</SelectItem>
                      <SelectItem value="Antihistamines">Antihistamines</SelectItem>
                      <SelectItem value="Gastrointestinal">Gastrointestinal</SelectItem>
                      <SelectItem value="Cardiovascular">Cardiovascular</SelectItem>
                      <SelectItem value="Diabetes">Diabetes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="e.g. 100"
                    value={newMedicine.stock}
                    onChange={(e) => setNewMedicine({ ...newMedicine, stock: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    placeholder="e.g. 5.99"
                    value={newMedicine.price}
                    onChange={(e) => setNewMedicine({ ...newMedicine, price: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Select
                    value={newMedicine.supplier}
                    onValueChange={(value) => setNewMedicine({ ...newMedicine, supplier: value })}
                  >
                    <SelectTrigger id="supplier">
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MediSupply Inc.">MediSupply Inc.</SelectItem>
                      <SelectItem value="PharmaWholesale Ltd.">PharmaWholesale Ltd.</SelectItem>
                      <SelectItem value="MediCare Distributions">MediCare Distributions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    type="date"
                    value={newMedicine.expiry}
                    onChange={(e) => setNewMedicine({ ...newMedicine, expiry: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMedicine}>
                Add Medicine
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <DataTable
        data={data}
        columns={columns}
        keyField="id"
        searchable
        pagination
        onRowClick={handleRowClick}
      />
    </DashboardLayout>
  );
};

export default Medicines;
