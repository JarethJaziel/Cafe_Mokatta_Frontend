import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },


    {
        path: 'products',
        loadComponent: () =>
            import('./features/products/pages/product-manager/product-manager.component')
                .then(m => m.ProductManager)
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./features/dashboard/pages/dashboard/dashboard.component')
                .then(m => m.Dashboard)
    },
    {
        path: 'inventory',
        loadComponent: () =>
            import('./features/inventory/pages/inventory-list/inventory-list.component')
                .then(m => m.InventoryList)
    },
    {
        path: 'order',
        loadComponent: () =>
            import('./features/orders/pages/order-pos/order-pos.component')
                .then(m => m.OrderPos)
    },
    //No se usa, pero por si acaso lo dejo
    {
        path: 'product-list',
        loadComponent: () =>
            import('./features/products/pages/product-list/product-list.component')
                .then(m => m.ProductList)
    },
    {
        path: 'products/:id',
        loadComponent: () =>
            import('./features/products/pages/product-detail/product-detail.component')
                .then(m => m.ProductDetail)
    },
    //---------

];
