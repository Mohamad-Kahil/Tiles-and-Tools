import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, Calendar } from "lucide-react";

interface TicketDetailViewProps {
  ticket: {
    id: string;
    subject: string;
    status: string;
    priority: string;
    customer: {
      name: string;
      email: string;
      phone: string;
      avatar: string;
      since: string;
    };
    order?: {
      id: string;
      date: string;
      items: string;
      expectedDelivery: string;
    };
    messages: Array<{
      sender: string;
      senderType: "customer" | "agent";
      avatar: string;
      time: string;
      content: string;
      note?: string;
    }>;
  };
}

const TicketDetailView: React.FC<TicketDetailViewProps> = ({ ticket }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold">{ticket.subject}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge
              variant="outline"
              className={
                ticket.status === "Open"
                  ? "bg-blue-100 text-blue-800"
                  : ticket.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
              }
            >
              {ticket.status}
            </Badge>
            <Badge variant="outline">{ticket.priority} Priority</Badge>
            <span className="text-xs">Ticket #{ticket.id}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Assign
          </Button>
          <Select defaultValue={ticket.status.toLowerCase()}>
            <SelectTrigger className="w-[130px] h-9">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-start gap-4 mb-6">
        <Avatar>
          <AvatarImage
            src={ticket.customer.avatar}
            alt={ticket.customer.name}
          />
          <AvatarFallback>{ticket.customer.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h4 className="font-medium">{ticket.customer.name}</h4>
          <div className="text-sm text-muted-foreground flex items-center gap-4">
            <span className="flex items-center">
              <Mail className="h-3.5 w-3.5 mr-1" /> {ticket.customer.email}
            </span>
            <span className="flex items-center">
              <Phone className="h-3.5 w-3.5 mr-1" /> {ticket.customer.phone}
            </span>
          </div>
          <div className="text-sm text-muted-foreground flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1" /> Customer since{" "}
            {ticket.customer.since}
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-6">
        <div className="space-y-4">
          {ticket.messages.map((message, index) => (
            <div key={index} className="flex items-start gap-4">
              <Avatar className="mt-0.5">
                <AvatarImage src={message.avatar} alt={message.sender} />
                <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div
                  className={`${message.senderType === "agent" ? "bg-primary/10" : "bg-muted"} p-4 rounded-lg`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{message.sender}</span>
                    <span className="text-xs text-muted-foreground">
                      {message.time}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                  {ticket.order && message.senderType === "customer" && (
                    <div className="mt-2 p-2 bg-background rounded border">
                      <div className="text-xs text-muted-foreground mb-1">
                        Order #{ticket.order.id}
                      </div>
                      <div className="text-sm font-medium">
                        {ticket.order.items}
                      </div>
                      <div className="text-xs">
                        Ordered: {ticket.order.date}
                      </div>
                      <div className="text-xs">
                        Expected Delivery: {ticket.order.expectedDelivery}
                      </div>
                    </div>
                  )}
                </div>
                {message.note && (
                  <div className="text-xs text-muted-foreground">
                    {message.note}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Textarea
            placeholder="Type your reply here..."
            className="min-h-[120px]"
          />
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Add Note
              </Button>
              <Button variant="outline" size="sm">
                Attach File
              </Button>
            </div>
            <Button>Send Reply</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailView;
