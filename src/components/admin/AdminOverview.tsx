import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, MessageSquare, HelpCircle, Settings, TrendingUp, Database } from 'lucide-react';

interface Stats {
  scooters: number;
  testimonials: number;
  faqs: number;
  techFeatures: number;
}

const AdminOverview = () => {
  const [stats, setStats] = useState<Stats>({
    scooters: 0,
    testimonials: 0,
    faqs: 0,
    techFeatures: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [scootersRes, testimonialsRes, faqsRes, techRes] = await Promise.all([
          (supabase as any).from('scooters').select('id', { count: 'exact' }),
          (supabase as any).from('testimonials').select('id', { count: 'exact' }),
          (supabase as any).from('faqs').select('id', { count: 'exact' }),
          (supabase as any).from('technology_features').select('id', { count: 'exact' }),
        ]);

        setStats({
          scooters: scootersRes.count || 0,
          testimonials: testimonialsRes.count || 0,
          faqs: faqsRes.count || 0,
          techFeatures: techRes.count || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Scooter Models',
      value: stats.scooters,
      icon: Zap,
      description: 'Active electric scooter models',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Customer Reviews',
      value: stats.testimonials,
      icon: MessageSquare,
      description: 'Customer testimonials',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'FAQ Items',
      value: stats.faqs,
      icon: HelpCircle,
      description: 'Frequently asked questions',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Tech Features',
      value: stats.techFeatures,
      icon: Settings,
      description: 'Technology highlights',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-8 bg-muted rounded w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-muted rounded w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-lg p-6 border border-primary/20">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
            <Database className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Welcome to Admin Dashboard</h2>
            <p className="text-muted-foreground mt-1">
              Manage your EvolutionEV website content in real-time
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Card key={index} className="relative overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`w-8 h-8 rounded-full ${card.bgColor} flex items-center justify-center`}>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription>
            Common tasks and management shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <h4 className="font-medium mb-2">Content Management</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Update scooter models, prices, and specifications
              </p>
              <Badge variant="secondary">Scooters Tab</Badge>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <h4 className="font-medium mb-2">Customer Feedback</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Manage testimonials and customer reviews
              </p>
              <Badge variant="secondary">Reviews Tab</Badge>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <h4 className="font-medium mb-2">Site Configuration</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Update company information and contact details
              </p>
              <Badge variant="secondary">Settings Tab</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;