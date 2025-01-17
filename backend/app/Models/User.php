<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'profession',
        'school',
        'role_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    //role relation
    public function role()
    {
        return $this->belongsTo(Role::class);
    }
    public function getRole()
    {
        return $this->role ? $this->role->role_type : null; // Safely access role_type
    }

    public function setRole($role)
    {
        // Check if role is an instance of Role, or retrieve it by ID
        if ($role instanceof Role) {
            $this->role()->associate($role);
        } elseif (is_numeric($role)) {
            $this->role_id = $role; // Set the role_id directly
        }

        $this->save(); // Save the changes to the user
    }
    //a user can have multiple messages
    public function messages()
    {
        return $this->hasMany(Message::class);
    }
    //a user can belong to multiple conversation
    public function conversations()
    {
        return $this->belongsToMany(Conversation::class);
    }
    // a user can belong to multiple groups
    public function group()
    {
        return $this->belongsToMany(Group::class);
    }
}
