<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class RolesAndAdminSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::findOrCreate('admin');
        Role::findOrCreate('user');

        $email = env('IQMO_ADMIN_EMAIL', 'admin@iqmo.local');
        $password = env('IQMO_ADMIN_PASSWORD', 'admin12345');

        $admin = User::query()->firstOrCreate(
            ['email' => $email],
            [
                'name' => 'Admin',
                'password' => Hash::make($password),
                'email_verified_at' => now(),
            ],
        );

        if (!$admin->hasRole($adminRole)) {
            $admin->assignRole($adminRole);
        }
    }
}
