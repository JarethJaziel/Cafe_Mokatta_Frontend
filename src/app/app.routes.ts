import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    
    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/pages/login/login.component').then(m => m.LoginComponent)
    },

    {
        path: 'products',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/products/pages/product-manager/product-manager.component')
                .then(m => m.ProductManager)
    },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/dashboard/pages/dashboard/dashboard.component')
                .then(m => m.Dashboard)
    },
    {
        path: 'inventory',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/inventory/pages/inventory-list/inventory-list.component')
                .then(m => m.InventoryList)
    },
    {
        path: 'order',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/orders/pages/order-pos/order-pos.component')
                .then(m => m.OrderPos)
    },
    {
        path: 'users',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/users/pages/user-list')
                .then(m => m.UserList)
    },
    {
        path: 'reports',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/reports/pages/reports-dashboard')
                .then(m => m.ReportsDashboard)
    },
    //No se usa, pero por si acaso lo dejo
    {
        path: 'product-list',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/products/pages/product-list/product-list.component')
                .then(m => m.ProductList)
    },
    {
        path: 'products/:id',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/products/pages/product-detail/product-detail.component')
                .then(m => m.ProductDetail)
    }
];
