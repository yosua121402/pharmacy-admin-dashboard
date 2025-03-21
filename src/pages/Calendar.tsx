
import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  List, 
  Grid3X3
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format, startOfToday, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';

// Mock data for appointments/events
const eventsData = [
  {
    id: 1,
    title: 'Monthly Inventory Check',
    date: '2023-11-05',
    time: '09:00 AM',
    type: 'inventory',
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Meeting with PharmaCorp',
    date: '2023-11-10',
    time: '11:30 AM',
    type: 'meeting',
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Stock Delivery - MediSupply',
    date: '2023-11-15',
    time: '02:00 PM',
    type: 'delivery',
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'Staff Training Session',
    date: '2023-11-20',
    time: '10:00 AM',
    type: 'training',
    status: 'upcoming',
  },
  {
    id: 5,
    title: 'End of Month Accounting',
    date: '2023-11-30',
    time: '04:00 PM',
    type: 'accounting',
    status: 'upcoming',
  },
];

const CalendarPage = () => {
  const today = startOfToday();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [currentMonth, setCurrentMonth] = useState<Date>(today);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  // Get all days in the current month
  const daysInMonth = eachDayOfInterval({
    start: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1),
    end: endOfMonth(currentMonth),
  });

  // Filter events for the selected date
  const selectedDateEvents = eventsData.filter(
    event => event.date === format(selectedDate, 'yyyy-MM-dd')
  );

  // Get events for each day in month view
  const getDayEvents = (day: Date) => {
    return eventsData.filter(
      event => event.date === format(day, 'yyyy-MM-dd')
    );
  };

  // Handle prev/next month navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Get event type badge color
  const getEventTypeColor = (type: string) => {
    const colors = {
      inventory: 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400',
      meeting: 'bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-400',
      delivery: 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400',
      training: 'bg-orange-100 text-orange-800 dark:bg-orange-800/20 dark:text-orange-400',
      accounting: 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400',
    };
    return colors[type as keyof typeof colors] || colors.meeting;
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground mt-1">
              Schedule and manage pharmacy events
            </p>
          </div>
          <div className="flex gap-2">
            <Tabs 
              defaultValue="month" 
              className="hidden md:flex"
              onValueChange={(value) => setViewMode(value as 'month' | 'week' | 'day')}
            >
              <TabsList>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="day">Day</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  onMonthChange={setCurrentMonth}
                  className="p-0"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>
                  Your scheduled events for this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                {eventsData.length > 0 ? (
                  <div className="space-y-4">
                    {eventsData.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-start gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                          <CalendarIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <div className="flex gap-2 text-sm text-muted-foreground">
                            <span>{event.date}</span>
                            <span>•</span>
                            <span>{event.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {eventsData.length > 3 && (
                      <Button variant="link" className="p-0 h-auto">
                        View {eventsData.length - 3} more events
                      </Button>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No upcoming events.</p>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle>
                      {format(currentMonth, 'MMMM yyyy')}
                    </CardTitle>
                    <CardDescription>
                      View and manage all scheduled events
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={prevMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <div className="flex border rounded-md p-1">
                      <Button 
                        variant={viewMode === 'month' ? 'default' : 'ghost'} 
                        size="sm" 
                        className="px-2 h-8"
                        onClick={() => setViewMode('month')}
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant={viewMode === 'day' ? 'default' : 'ghost'} 
                        size="sm" 
                        className="px-2 h-8"
                        onClick={() => setViewMode('day')}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {viewMode === 'month' ? (
                  <div className="grid grid-cols-7 gap-1">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="h-8 text-center text-sm font-medium">
                        {day}
                      </div>
                    ))}
                    {daysInMonth.map((day, i) => {
                      const dayEvents = getDayEvents(day);
                      return (
                        <div 
                          key={i}
                          className={`
                            min-h-[100px] p-1 border rounded-md cursor-pointer transition-colors
                            ${isSameDay(day, selectedDate) ? 'bg-primary/5 border-primary/20' : 'hover:bg-muted/50'}
                            ${isToday(day) ? 'border-primary/50' : 'border-border'}
                          `}
                          onClick={() => setSelectedDate(day)}
                        >
                          <div className="flex justify-between items-start p-1">
                            <span className={`text-sm font-medium ${isToday(day) ? 'text-primary' : ''}`}>
                              {format(day, 'd')}
                            </span>
                            {dayEvents.length > 0 && (
                              <Badge variant="outline" className="h-5 px-1">
                                {dayEvents.length}
                              </Badge>
                            )}
                          </div>
                          <div className="space-y-1 mt-1">
                            {dayEvents.slice(0, 2).map((event) => (
                              <div 
                                key={event.id} 
                                className={`
                                  text-xs p-1 rounded truncate
                                  ${getEventTypeColor(event.type)}
                                `}
                              >
                                {event.time} {event.title}
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-muted-foreground pl-1">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <h3 className="font-semibold mb-4">
                      Events for {format(selectedDate, 'MMMM d, yyyy')}
                    </h3>
                    {selectedDateEvents.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Time</TableHead>
                            <TableHead>Event</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedDateEvents.map((event) => (
                            <TableRow key={event.id}>
                              <TableCell>{event.time}</TableCell>
                              <TableCell className="font-medium">{event.title}</TableCell>
                              <TableCell>
                                <Badge 
                                  variant="outline" 
                                  className={getEventTypeColor(event.type)}
                                >
                                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant={event.status === 'completed' ? 'outline' : 'default'}>
                                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No events scheduled for this day. 
                        <Button variant="link" className="px-1 h-auto">
                          Add an event
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
